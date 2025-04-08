const axios = require('axios');

describe('Rate limiter no servidor real', () => {

  const URL = 'http://localhost:3000/login'; // ou a porta que seu server está usando

  it('Deve bloquear após 5 requisições', async () => {
    let lastStatus = 0;

    for (let i = 0; i < 6; i++) {
      const res = await axios.post(URL).catch(err => err.response);
      lastStatus = res.status;

      if (i < 5) {
        expect(res.status).toBe(200);
      } else {
        expect(res.status).toBe(429);
        expect(res.data).toBe("Muitas tentativas de login, tente novamente mais tarde.");
      }
    }

    expect(lastStatus).toBe(429);
  });

});
