const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Enable CORS for all routes
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Add custom routes for filtering and pagination
server.get('/api/distributions', (req, res) => {
  const db = router.db;
  let distributions = db.get('distributions').value();
  
  // Apply filters
  if (req.query.region) {
    distributions = distributions.filter(dist => 
      dist.region.toLowerCase().includes(req.query.region.toLowerCase())
    );
  }
  
  if (req.query.status) {
    distributions = distributions.filter(dist => dist.status === req.query.status);
  }
  
  // Apply pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  const paginatedData = distributions.slice(startIndex, endIndex);
  
  res.json({
    data: paginatedData,
    total: distributions.length,
    page,
    limit
  });
});

server.get('/api/distributions/:id', (req, res) => {
  const db = router.db;
  const distribution = db.get('distributions').find({ id: req.params.id }).value();
  
  if (!distribution) {
    return res.status(404).json({ error: 'Distribution not found' });
  }
  
  res.json({ data: distribution });
});

// Use default middlewares and router
server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
  console.log(`API endpoints:`);
  console.log(`  GET /api/distributions - Get all distributions with filtering and pagination`);
  console.log(`  GET /api/distributions/:id - Get specific distribution`);
  console.log(`  GET /distributions - Raw JSON data`);
});
