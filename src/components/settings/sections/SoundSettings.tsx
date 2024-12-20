import React from 'react';
import { Volume2, Music, Zap } from 'lucide-react';
import { useSettings } from '../../../hooks/useSettings';
import SettingsSection from '../ui/SettingsSection';
import Toggle from '../ui/Toggle';
import Slider from '../ui/Slider';

const SoundSettings: React.FC = () => {
  const { settings, updateSoundSettings } = useSettings();
  const { sound } = settings;

  return (
    <SettingsSection title="Sound" icon={Volume2}>
      <div className="space-y-6">
        <Toggle
          label="Sound Effects"
          icon={Zap}
          checked={sound.effects}
          onChange={(checked) => updateSoundSettings({ effects: checked })}
        />
        
        <Toggle
          label="Background Music"
          icon={Music}
          checked={sound.music}
          onChange={(checked) => updateSoundSettings({ music: checked })}
        />
        
        <Slider
          label="Volume"
          value={sound.volume}
          onChange={(value) => updateSoundSettings({ volume: value })}
          min={0}
          max={1}
          step={0.1}
        />
      </div>
    </SettingsSection>
  );
};

export default SoundSettings;