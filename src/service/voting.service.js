import Api, { API_URL } from "./Api";

export async function castVote(data) {
  const res = await Api({
    method: "POST",
    url: `${API_URL}${data}`,
  });
  return res.data;
}

export async function getVotingResults() {
  const res = await Api({
    method: "GET",
    url: `${API_URL}/results`,
  });
  return res.data;
}

