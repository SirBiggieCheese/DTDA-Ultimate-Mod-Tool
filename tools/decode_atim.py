#!/usr/bin/env python
"""
decode_atim.py  --  Decode a DOOM: The Dark Ages ATIM/BIM streamed texture (Oodle-compressed BC7)
to a small PNG thumbnail (data URL on stdout). Reused, proven recipe from the HUD-face decode.

Usage:  python decode_atim.py <path-to-ATIM-file> [maxSize]
Prints: a data:image/png;base64,... URL on success, or "ERR: <reason>" on failure.

Requires: texture2ddecoder, Pillow, and the game's oo2core_9_win64.dll (auto-located).
"""
import sys, os, struct, ctypes, base64, io, glob

def find_oodle():
    cand = [
        r"C:\Program Files (x86)\Steam\steamapps\common\DOOMTheDarkAges\oo2core_9_win64.dll",
    ]
    for c in cand:
        if os.path.exists(c):
            return c
    # fall back to a broad glob under common Steam library roots
    for root in [r"C:\Program Files (x86)\Steam\steamapps\common", r"D:\SteamLibrary\steamapps\common", r"E:\SteamLibrary\steamapps\common"]:
        hits = glob.glob(os.path.join(root, "DOOMTheDarkAges", "oo2core_9_win64.dll"))
        if hits:
            return hits[0]
    return None

_DLL = None
def oodle_decompress(comp, raw_size):
    global _DLL
    if _DLL is None:
        p = find_oodle()
        if not p:
            raise RuntimeError("oo2core_9_win64.dll not found")
        _DLL = ctypes.WinDLL(p)
    fn = _DLL.OodleLZ_Decompress
    fn.restype = ctypes.c_longlong
    out = ctypes.create_string_buffer(raw_size + 65536)
    n = fn(bytes(comp), ctypes.c_longlong(len(comp)), out, ctypes.c_longlong(raw_size),
           1, 0, 0, 0, 0, 0, 0, 0, 0, 3)
    if n != raw_size:
        return None
    return out.raw[:raw_size]

def parse_mips(data):
    """Mip table = 36-byte <9i> entries starting at 0x64: w,h,_,rawSize,_,compSize,blobOff,mipIdx,_."""
    mips = []
    off = 0x64
    while off + 36 <= len(data):
        w, h, _a, rawSize, _b, compSize, blobOff, mipIdx, _c = struct.unpack_from("<9i", data, off)
        if w <= 0 or h <= 0 or w > 16384 or h > 16384 or rawSize <= 0 or compSize <= 0 or compSize > len(data):
            break
        mips.append(dict(w=w, h=h, rawSize=rawSize, compSize=compSize, blobOff=blobOff, mip=mipIdx))
        off += 36
    return mips

def find_blob_start(data, mips):
    """The table's blobOff is relative to an unknown blob-section start. Compute it analytically: the last main-blob mip
    (max blobOff+compSize) ends at ~EOF, so blob_start = fileLen - (blobOff+compSize). Verify with that mip (small comp =
    fast), with a tiny scan fallback for padding differences."""
    last = max(mips, key=lambda m: m["blobOff"] + m["compSize"])
    guess = len(data) - (last["blobOff"] + last["compSize"])
    for delta in (0, -1, 1, -2, 2, -4, 4, -8, 8, -16, 16, -32, 32):
        bs = guess + delta
        off = bs + last["blobOff"]
        if off < 0 or off + last["compSize"] > len(data):
            continue
        try:
            if oodle_decompress(data[off:off + last["compSize"]], last["rawSize"]) is not None:
                return bs
        except Exception:
            pass
    # last resort: bounded brute scan for mip0
    mip0 = min(mips, key=lambda m: m["blobOff"])
    for o in range(0x40, 4096):
        try:
            if oodle_decompress(data[o:o + mip0["compSize"]], mip0["rawSize"]) is not None:
                return o - mip0["blobOff"]
        except Exception:
            pass
    return None

def decode(path, maxSize=256, kind=None):
    import texture2ddecoder
    from PIL import Image
    data = open(path, "rb").read()
    if data[:4] != b"ATIM":
        return "ERR: not an ATIM texture"
    mips = parse_mips(data)
    if not mips:
        return "ERR: no mip table"
    mip0 = min(mips, key=lambda m: m["blobOff"])          # top mip (smallest blobOff, usually 0)
    blob_start = find_blob_start(data, mips)
    if blob_start is None:
        return "ERR: could not locate compressed data"
    # Choose the smallest mip that is still >= maxSize (fast), else the largest available.
    big = [m for m in mips if m["w"] >= maxSize and m["h"] >= maxSize]
    m = min(big, key=lambda x: x["w"]) if big else max(mips, key=lambda x: x["w"])
    seg = data[blob_start + m["blobOff"]: blob_start + m["blobOff"] + m["compSize"]]
    raw = oodle_decompress(seg, m["rawSize"])
    if raw is None:
        # fall back to mip0 if the chosen mip's offset was off
        m = mip0
        seg = data[blob_start:][: m["compSize"]]
        raw = oodle_decompress(seg, m["rawSize"])
        if raw is None:
            return "ERR: decompress failed"
    W = (m["w"] + 3) & ~3
    H = (m["h"] + 3) & ~3
    bpp = m["rawSize"] / float(W * H)          # 0.5 = BC1/BC4 (4-bit blocks), 1.0 = BC7 (8-bit blocks)
    low = path.lower()
    # smoothness maps = BC4 single channel. Prefer the explicit kind (the temp file passed over IPC loses the mtlkind name).
    if kind:
        is_gray = (kind.lower() == "smoothness")
    else:
        is_gray = ("mtlkind=smoothness" in low) or low.endswith("_g") or "_g.tga" in low
    if bpp > 0.6:
        px = texture2ddecoder.decode_bc7(raw, W, H)
        img = Image.frombytes("RGBA", (W, H), bytes(px), "raw", "BGRA").crop((0, 0, m["w"], m["h"]))
    elif is_gray:
        px = texture2ddecoder.decode_bc4(raw, W, H)         # value lands in the R (BGRA) channel
        r = Image.frombytes("RGBA", (W, H), bytes(px), "raw", "BGRA").crop((0, 0, m["w"], m["h"])).split()[0]
        img = Image.merge("RGB", (r, r, r)).convert("RGBA")  # show smoothness as grayscale
    else:
        px = texture2ddecoder.decode_bc1(raw, W, H)
        img = Image.frombytes("RGBA", (W, H), bytes(px), "raw", "BGRA").crop((0, 0, m["w"], m["h"]))
    if img.width > maxSize or img.height > maxSize:
        img.thumbnail((maxSize, maxSize), Image.LANCZOS)
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode("ascii")

if __name__ == "__main__":
    try:
        p = sys.argv[1]
        mx = int(sys.argv[2]) if len(sys.argv) > 2 else 256
        kd = sys.argv[3] if len(sys.argv) > 3 else None
        sys.stdout.write(decode(p, mx, kd))
    except Exception as e:
        sys.stdout.write("ERR: " + str(e))
