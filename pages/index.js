import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export default function Home() {
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  // Connect to MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setWalletAddress(accounts[0]);
      setIsConnected(true);
    } else {
      alert('Please install MetaMask.');
    }
  };

  // Get balance for connected wallet
  const getBalance = async () => {
    if (window.ethereum && walletAddress) {
      // Use the correct provider initialization for ethers v6
      const provider = new ethers.BrowserProvider(window.ethereum); // Correct method to create provider in ethers v6
      const balance = await provider.getBalance(walletAddress);
      setBalance(ethers.formatEther(balance)); // Correct usage of formatEther method in ethers v6
    }
  };

  useEffect(() => {
    if (isConnected) {
      getBalance();
    }
  }, [isConnected]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <button
        onClick={connectWallet}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#f6851b',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
        }}
      >
        {isConnected ? 'Connected' : 'Connect with MetaMask'}
      </button>

      {isConnected && (
        <div style={{ marginTop: '20px' }}>
          <p><strong>Wallet Address:</strong> {walletAddress}</p>
          <p><strong>Balance:</strong> {balance} ETH</p>
        </div>
      )}
    </div>
  );
}
