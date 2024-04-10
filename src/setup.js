import { createProxyMiddleware } from 'http-proxy-middleware';

  export default function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://d1krvzwx5oquy1.cloudfront.net',
      changeOrigin: true,
    })
  );
}