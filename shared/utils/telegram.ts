import fetch from 'node-fetch';

export class TgClient {
  token = process.env.TG_BOT_TOKEN;
  ghUsers = {
    favetisov: { chatId: 109124816, login: '@favetisov' },
    pyfuk: { chatId: 145871247, login: '@Shaxboz_Khalikov' },
    tonypizzicato: { chatId: 397993844 },
    channel: { chatId: -1001273536067 },
  };

  async call(command, params = {}) {
    const response = await fetch(`https://api.telegram.org/bot${this.token}/${command}`, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: { 'Content-Type': 'application/json' },
    });
    return await response.json();
  }

  async sendMessage(ghUser: string, text: string) {
    const user = this.ghUsers[ghUser];
    if (!user) {
      console.warn(`No telegram user set for github account '${ghUser}'`);
    } else {
      const response = await this.call('sendMessage', {
        chat_id: user.chatId,
        text,
        parse_mode: 'markdown',
      });
      return response;
    }
  }
}
