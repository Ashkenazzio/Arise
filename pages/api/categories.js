// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

function handler(req, res) {
  if (req.get)

  res.status(200).json({ name: 'John Doe' });
}

export default handler;
