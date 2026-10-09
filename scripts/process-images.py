import os
from PIL import Image

src_base = r"C:\Users\tummala surya\Downloads\next farm"
dest_base = r"c:\Users\tummala surya\Documents\antigravity\brave-turing\next-farm-website\public\images\products"
brand_dest = r"c:\Users\tummala surya\Documents\antigravity\brave-turing\next-farm-website\public\images\brand"

os.makedirs(dest_base, exist_ok=True)
os.makedirs(brand_dest, exist_ok=True)

def optimize_save(src_path, dest_path, max_dim=1600):
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    with Image.open(src_path) as im:
        # Resize if larger than max_dim
        w, h = im.size
        if max(w, h) > max_dim:
            scale = max_dim / max(w, h)
            new_size = (int(w * scale), int(h * scale))
            im = im.resize(new_size, Image.Resampling.LANCZOS)
        
        # Save PNG with optimize
        if im.mode in ('RGBA', 'LA') or (im.mode == 'P' and 'transparency' in im.info):
            im.save(dest_path, format='PNG', optimize=True)
        else:
            im.convert('RGB').save(dest_path, format='PNG', optimize=True)
        print(f"Saved: {dest_path} ({im.size})")

# 1. Process Logo
logo_src = os.path.join(src_base, "next farm logo.png")
if os.path.exists(logo_src):
    optimize_save(logo_src, os.path.join(brand_dest, "logo_main.png"), max_dim=1200)

# 2. Mapping products to their source directories and filenames
product_map = {
    'next-viro-nill': {
        'shoot': os.path.join(src_base, 'next vironill', 'next viro nill shoot.png'),
        'caa': os.path.join(src_base, 'next vironill', 'next vironill caa compilance.png'),
        'farmer': os.path.join(src_base, 'next vironill', 'next vironill farmer holding.png'),
        'farm': os.path.join(src_base, 'next vironill', 'next vironill infront of farm.png'),
        'pond': os.path.join(src_base, 'next vironill', 'vironill near pond.png'),
    },
    'next-gut': {
        'shoot': os.path.join(src_base, 'next gut', 'next gut shoot.png'),
        'caa': os.path.join(src_base, 'next gut', 'next gut caa compilance.png'),
        'farmer': os.path.join(src_base, 'next gut', 'next gut farmer holding.png'),
        'farm': os.path.join(src_base, 'next gut', 'next gut infront of farm.png'),
    },
    'next-converter': {
        'shoot': os.path.join(src_base, 'next converter', 'next converter shoot.png'),
        'caa': os.path.join(src_base, 'next converter', 'next converter caa compilance shoot.png'),
        'farmer': os.path.join(src_base, 'next converter', 'next converter farmer holding.png'),
        'farm': os.path.join(src_base, 'next converter', 'next converter infront of farm.png'),
    },
    'next-food-pro': {
        'shoot': os.path.join(src_base, 'next food pro', 'next food pro shoot.png'),
        'caa': os.path.join(src_base, 'next food pro', 'food pro caa compliance.png'),
        'farmer': os.path.join(src_base, 'next food pro', 'next food pro farmer holding.png'),
        'farm': os.path.join(src_base, 'next food pro', 'food pro front of farm.png'),
    },
    'next-min': {
        'shoot': os.path.join(src_base, 'next min', 'next min shoot.png'),
        'farm': os.path.join(src_base, 'next min', 'next mmin infront of farm.png'),
    },
    'next-pro': {
        'shoot': os.path.join(src_base, 'next pro', 'next pro shoot.png'),
        'caa': os.path.join(src_base, 'next pro', 'next pro caa compilance.png'),
        'farmer': os.path.join(src_base, 'next pro', 'next pro farmer holding.png'),
        'farm': os.path.join(src_base, 'next pro', 'next pro in front of farm.png'),
    },
    'next-pro-plus': {
        'shoot': os.path.join(src_base, 'next pro', 'next pro shoot.png'),
        'caa': os.path.join(src_base, 'next pro', 'next pro caa compilance.png'),
        'farmer': os.path.join(src_base, 'next pro', 'next pro farmer holding.png'),
        'farm': os.path.join(src_base, 'next pro', 'next pro in front of farm.png'),
    },
    'next-remedy': {
        'shoot': os.path.join(src_base, 'next remedy', 'next remedy shoot.png'),
        'caa': os.path.join(src_base, 'next remedy', 'next remedy caa compilance.png'),
        'farmer': os.path.join(src_base, 'next remedy', 'next remedy farmer holding.png'),
        'farm': os.path.join(src_base, 'next remedy', 'next remedy infront of farm.png'),
    },
    'next-sludge': {
        'shoot': os.path.join(src_base, 'next sludge', 'next sludge shoot.png'),
        'caa': os.path.join(src_base, 'next sludge', 'next sludge caa compilance.png'),
        'farmer': os.path.join(src_base, 'next sludge', 'next sludge farmer holding.png'),
        'farm': os.path.join(src_base, 'next sludge', 'next sludge in front of farm.png'),
    },
    'next-softner': {
        'shoot': os.path.join(src_base, 'next softner', 'next softner shoot.png'),
        'caa': os.path.join(src_base, 'next softner', 'next softner caa compilance.png'),
        'farmer': os.path.join(src_base, 'next softner', 'next softner farmer holding.png'),
        'farm': os.path.join(src_base, 'next softner', 'next softner infront of pond.png'),
    },
    'next-vibriosis': {
        'shoot': os.path.join(src_base, 'next vibriosis', 'next vibriosis shoot.png'),
        'caa': os.path.join(src_base, 'next vibriosis', 'vibriosis caa compiance image.png'),
        'farmer': os.path.join(src_base, 'next vibriosis', 'next vibriosis farmer holding.png'),
        'farm': os.path.join(src_base, 'next vibriosis', 'vibriosis in front of pond.png'),
    }
}

for slug, views in product_map.items():
    p_dir = os.path.join(dest_base, slug)
    os.makedirs(p_dir, exist_ok=True)
    for view_key, file_path in views.items():
        if os.path.exists(file_path):
            target = os.path.join(p_dir, f"{view_key}.png")
            optimize_save(file_path, target)
        else:
            print(f"Warning: File not found {file_path}")

print("✨ ALL IMAGES PROCESSED AND ORGANIZED!")
