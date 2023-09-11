const { queryCandidates, getCandidateById, deleteUserById } = require("./candidate.service");

async function getAllCandidates(req, res) {
  try {
    const { page, pageSize } = req.query;
    const candidates = await queryCandidates({ page, pageSize });
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching candidates' });
  }
}


async function getCandidate(req, res) {
  try {
    const { id } = req.params;
    const candidate = await getCandidateById(id);
    if (candidate) {
      res.json(candidate);
    } else {
      res.status(404).json({ error: 'Candidate not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching candidate' });
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const candidate = await deleteUserById(id);
    res.json(candidate);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching candidate' });
  }
}

module.exports = { getAllCandidates, getCandidate, deleteUser };
