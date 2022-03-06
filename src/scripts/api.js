const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/pQBseecJSYObMTCZR0RB/scores';

const sendScore = async (formData) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const status = await response.json();
  return status;
};

const fetchScores = async () => {
  const response = await fetch(baseUrl);
  const scores = response.json();
  return scores;
};

export { fetchScores, sendScore };
