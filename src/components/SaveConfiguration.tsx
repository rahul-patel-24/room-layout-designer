import React from 'react';

interface SaveConfigurationProps {
  onSave: () => void;
}

const SaveConfiguration: React.FC<SaveConfigurationProps> = ({ onSave }) => {
  return <button onClick={onSave}>Save Configuration</button>;
};

export default SaveConfiguration;
