import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import beepSound from '../audio/detector-69477.mp3'; // Import your beep sound file

const useSocket = (url: string, sellerId: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const socketInstance = io(url);
    const audio = new Audio(beepSound); // Create an Audio object with the sound file

    // When socket connects, emit 'seller_join' with the seller's ID
    socketInstance.on('connect', () => {
      console.log('Connected to server:', socketInstance.id);
      socketInstance.emit('seller_join', sellerId); // Emit seller join event
      setSocket(socketInstance);
    });

    // Listen for 'new-order' event
    socketInstance.on('new-order', (message: string) => {
      console.log('Received new order notification:', message);
      setMessages((prevMessages) => [...prevMessages, message]);
      // Play beep sound when a new order is received
      audio.play().catch((error) => {
        console.error('Failed to play sound:', error);
      });
    });

    // Handle disconnection
    socketInstance.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      if (socketInstance) socketInstance.disconnect();
    };
  }, [url, sellerId]);

  return { socket, messages };
};

export default useSocket;
