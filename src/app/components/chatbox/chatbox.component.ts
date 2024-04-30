import { Component } from '@angular/core';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css'],
})
export class ChatboxComponent {
  messages: Message[] = [];
  newMessage: string = '';

  sendMessage() {
    if (this.newMessage) {
      const userMessage: Message = {
        content: this.newMessage,
        sender: 'user',
      };
      this.messages.push(userMessage);

      // Simular respuesta automática
      setTimeout(() => {
        const response: Message = {
          content: this.generateRandomResponse(),
          sender: 'bot',
        };
        this.messages.push(response);
      }, 500);

      this.newMessage = '';
    }
  }

  generateRandomResponse(): string {
    const responses = [
      '¡Hola! ¿En qué puedo ayudarte?',
      'Estoy aquí para responder tus preguntas.',
      'No entiendo lo que dices, ¿podrías reformularlo?',
      'Me alegra que estés interesado en nuestros servicios.',
      'Lamentablemente, no tengo información sobre ese tema en particular.',
      '¿Hay algo más en lo que pueda asistirte?',
    ];
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  }
}

interface Message {
  content: string;
  sender: 'user' | 'bot';
}