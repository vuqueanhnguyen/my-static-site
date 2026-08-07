# Images Folder

Upload your handbag photos here. Then reference them in `gallery-data.js` using the path: `images/your-image-name.jpg`

## Supported formats
- `.jpg` / `.jpeg`
- `.png`
- `.webp`

## Example usage in gallery-data.js

```javascript
{
  id: 1,
  title: 'My Custom Bag',
  desc: 'Description of your bag.',
  image: 'images/my-bag.jpg',  // Reference local image
  tags: ['Custom', 'Handmade']
}
```

## How to add images

1. **Via GitHub Web:**
   - Go to https://github.com/vuqueanhnguyen/my-static-site
   - Navigate to the `images` folder
   - Click "Add file" → "Upload files"
   - Drag and drop your images
   - Commit the changes

2. **Via Git (from VS Code terminal):**
   ```bash
   # Copy your images to this folder
   # Then run:
   git add images/
   git commit -m "add: new product photos"
   git push
   ```

3. **Local Development:**
   - Drop image files directly into this folder
   - Reference them as `images/filename.jpg` in gallery-data.js
   - Test locally, then push to GitHub

## File size tips
- Keep images under 1MB for faster loading
- Use `.jpg` for photos (smaller file size)
- Use `.png` for images with transparency
