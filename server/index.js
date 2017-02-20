const app = require('./app');

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`fbhack is running and listening on port ${PORT}`);
});
