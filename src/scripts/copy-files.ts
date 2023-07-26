import ncp from 'ncp';

// Copiar la carpeta "public" a la carpeta "dist"
ncp('./src/public', './dist/public', (err) => {
  if (err) {
    console.error('Error copying public folder:', err);
  } else {
    console.log('Public folder copied successfully!');
  }
});

// Copiar la carpeta "views" a la carpeta "dist"
ncp('./src/views', './dist/views', (err) => {
  if (err) {
    console.error('Error copying views folder:', err);
  } else {
    console.log('Views folder copied successfully!');
  }
});
