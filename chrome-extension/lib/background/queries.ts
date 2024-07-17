export async function sendQuestionAnswer(question: string, answer: string) {
  if (!question || !answer) {
    return;
  }

  const data = {
    question: question,
    answer: answer,
  };

  try {
    const cookies = await chrome.cookies.getAll({ url: 'http://localhost:3000/' });
    const cookieHeader = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
    const response = await fetch('http://localhost:3000/api/send-qa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieHeader,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Bad request');
    }

    const result = await response.json();
    console.log('API response:', result);
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

export async function getQuestion(): Promise<Questionwithlink> {
  try {
    const cookies = await chrome.cookies.getAll({ url: 'http://localhost:3000/' });
    const cookieHeader = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
    const response = await fetch('http://localhost:3000/api/questions', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieHeader,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch question');
    }

    const result = await response.json();
    return { question: result.question, link: result.url }; // Assuming the API returns a JSON object with a 'question' field
  } catch (error) {
    console.error('Error fetching question:', error);
    await chrome.tabs.update({ url: 'http://localhost:3000/login' });
    return { question: 'Error fetching question', link: 'http://localhost:3000/login' };
  }
}

export async function sendMessage(text: string | undefined, tab: chrome.tabs.Tab | undefined) {
  if (!text || !tab?.url) {
    await chrome.tabs.update({ url: 'http://localhost:3000/api/send-message' });
    return;
  }
  const url = new URL(tab.url);
  const domain = url;
  const data = {
    text: text,
    domain: domain,
  };

  try {
    const cookies = await chrome.cookies.getAll({ url: 'http://localhost:3000/' });
    const cookieHeader = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
    const response = await fetch('http://localhost:3000/api/send-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieHeader,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Bad request');
    }

    const result = await response.json();
    if (result.next) {
      await chrome.tabs.update({ url: result.next });
    }
    console.log('API response:', result);
  } catch (error) {
    await chrome.tabs.update({ url: 'http://localhost:3000/login' });
  }
}

export interface Questionwithlink {
  question: string;
  link: string;
}
