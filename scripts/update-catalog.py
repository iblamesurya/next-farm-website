import re

gallery_map = {
    'next-viro-nill': [
        '/images/products/next-viro-nill/shoot.png',
        '/images/products/next-viro-nill/caa.png',
        '/images/products/next-viro-nill/farmer.png',
        '/images/products/next-viro-nill/farm.png',
        '/images/products/next-viro-nill/pond.png'
    ],
    'next-gut': [
        '/images/products/next-gut/shoot.png',
        '/images/products/next-gut/caa.png',
        '/images/products/next-gut/farmer.png',
        '/images/products/next-gut/farm.png'
    ],
    'next-converter': [
        '/images/products/next-converter/shoot.png',
        '/images/products/next-converter/caa.png',
        '/images/products/next-converter/farmer.png',
        '/images/products/next-converter/farm.png'
    ],
    'next-food-pro': [
        '/images/products/next-food-pro/shoot.png',
        '/images/products/next-food-pro/caa.png',
        '/images/products/next-food-pro/farmer.png',
        '/images/products/next-food-pro/farm.png'
    ],
    'next-min': [
        '/images/products/next-min/shoot.png',
        '/images/products/next-min/farm.png'
    ],
    'next-pro': [
        '/images/products/next-pro/shoot.png',
        '/images/products/next-pro/caa.png',
        '/images/products/next-pro/farmer.png',
        '/images/products/next-pro/farm.png'
    ],
    'next-pro-plus': [
        '/images/products/next-pro-plus/shoot.png',
        '/images/products/next-pro-plus/caa.png',
        '/images/products/next-pro-plus/farmer.png',
        '/images/products/next-pro-plus/farm.png'
    ],
    'next-remedy': [
        '/images/products/next-remedy/shoot.png',
        '/images/products/next-remedy/caa.png',
        '/images/products/next-remedy/farmer.png',
        '/images/products/next-remedy/farm.png'
    ],
    'next-sludge': [
        '/images/products/next-sludge/shoot.png',
        '/images/products/next-sludge/caa.png',
        '/images/products/next-sludge/farmer.png',
        '/images/products/next-sludge/farm.png'
    ],
    'next-softner': [
        '/images/products/next-softner/shoot.png',
        '/images/products/next-softner/caa.png',
        '/images/products/next-softner/farmer.png',
        '/images/products/next-softner/farm.png'
    ],
    'next-vibriosis': [
        '/images/products/next-vibriosis/shoot.png',
        '/images/products/next-vibriosis/caa.png',
        '/images/products/next-vibriosis/farmer.png',
        '/images/products/next-vibriosis/farm.png'
    ]
}

with open('src/lib/catalog.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Update pricing structure across catalog:
# can5L: 5000,
# bottle1L: 1199,
# mrp5L: 6500,
# mrp1L: 1600
old_pricing = """    pricing: {
      can5L: 5000,
      bottle1L: 1199,
      mrp5L: 6500,
      mrp1L: 1600
    },"""

new_pricing = """    pricing: {
      can5L: 5000,
      pack2L: 2299,
      bottle1L: 1199,
      mrp5L: 6500,
      mrp2L: 3200,
      mrp1L: 1600
    },
    format2L: '2-Liter Twin Field Pack',"""

content = content.replace(old_pricing, new_pricing)

# Update each product's packshot and gallery
for slug, images in gallery_map.items():
    shoot_img = images[0]
    
    # Replace packshotImage
    packshot_pattern = rf"(slug:\s*'{slug}',[\s\S]*?packshotImage:\s*)'[^']+'"
    content = re.sub(packshot_pattern, rf"\g<1>'{shoot_img}'", content, count=1)
    
    # Replace galleryImages
    formatted_gallery = "[\n      " + ",\n      ".join(f"'{img}'" for img in images) + "\n    ]"
    gallery_pattern = rf"(slug:\s*'{slug}',[\s\S]*?galleryImages:\s*)\[[\s\S]*?\]"
    content = re.sub(gallery_pattern, rf"\g<1>{formatted_gallery}", content, count=1)

with open('src/lib/catalog.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Catalog successfully updated with all images and 2L pricing!")
