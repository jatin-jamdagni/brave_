import {createCanvas} from 'canvas';

export async function generateKitLabel({
  kitName = 'I-GEL KIT',
  boxNo = '38',
  boxName = 'AIRWAY BOX',
} = {}) {
  // Create canvas
  const canvas = createCanvas(800, 1100);
  const ctx = canvas.getContext('2d');

  // Set background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, 800, 1100);

  // Add yellow border
  ctx.fillStyle = '#FFE600';
  ctx.fillRect(10, 10, 780, 1080);

  // Add white sections
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(30, 30, 740, 100); // Logo area
  ctx.fillRect(30, 150, 740, 100); // Kit name area
  ctx.fillRect(100, 400, 600, 300); // Box info area
  ctx.fillRect(30, 950, 740, 100); // Tag area

  // Add text
  ctx.fillStyle = '#000000';
  ctx.textAlign = 'center';

  // Logo text
  ctx.font = 'bold 48px Arial';
  ctx.fillText('LIFENITY', 400, 100);

  // Kit name
  ctx.font = 'bold 56px Arial';
  ctx.fillText(kitName, 400, 220);

  // Instructions
  ctx.font = 'bold 36px Arial';
  ctx.fillText('PUT THE KIT BACK IN', 400, 500);

  // Box number
  ctx.font = 'bold 48px Arial';
  ctx.fillText(`BOX NO. ${boxNo}`, 400, 580);

  // Box name
  ctx.font = 'bold 48px Arial';
  ctx.fillText(boxName, 400, 650);

  // Tag
  ctx.font = '36px Arial';
  ctx.fillText('Tag', 400, 1020);

  // Convert to base64
  const base64Image = canvas.toDataURL('image/jpeg', 0.9);

  console.log('Generated Base64 Image:');
  console.log(base64Image.substring(0, 100) + '...');

  return base64Image;
}

// Test the function with sample data
generateKitLabel({
  kitName: 'I-GEL KIT',
  boxNo: '38',
  boxName: 'AIRWAY BOX',
});
