// IMPORTANTE: Reemplaza SCRIPT_URL con la URL de tu nuevo Apps Script para Asesorías
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwR_NzSkDXB2KoMUbTGQ7HeE8I4jf5fGfYOMLaMzU6ZjZtIYM6wEi1fdMQ2G7pK-_m_Kg/exec';

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    let response;

    if (event.httpMethod === 'GET') {
      const action = event.queryStringParameters?.action || 'getAll';
      response = await fetch(`${SCRIPT_URL}?action=${action}`, {
        method: 'GET',
        redirect: 'follow'
      });
    } else if (event.httpMethod === 'POST') {
      const rawBody = event.body || '{}';
      const formData = new URLSearchParams();
      formData.append('data', rawBody);
      response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
        redirect: 'follow'
      });
    }

    const text = await response.text();
    return { statusCode: 200, headers, body: text };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message })
    };
  }
};
