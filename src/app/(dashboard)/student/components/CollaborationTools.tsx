'use client';

import { Badge } from '@/components/ui/Badge';

interface CollaborationToolsProps {
  tools: {
    chat: boolean;
    whiteboard: boolean;
    documentSharing: boolean;
    screenSharing: boolean;
    recording: boolean;
  };
  showLabels?: boolean;
}

export function CollaborationTools({ tools, showLabels = false }: CollaborationToolsProps) {
  const activeTools = Object.entries(tools).filter(([_, enabled]) => enabled);

  return (
    <div className="flex flex-wrap gap-2">
      {tools.chat && (
        <Badge variant="default" className="text-xs">
          {showLabels ? 'Chat' : '💬'}
        </Badge>
      )}
      {tools.whiteboard && (
        <Badge variant="default" className="text-xs">
          {showLabels ? 'Tableau blanc' : '🖼️'}
        </Badge>
      )}
      {tools.documentSharing && (
        <Badge variant="default" className="text-xs">
          {showLabels ? 'Documents' : '📄'}
        </Badge>
      )}
      {tools.screenSharing && (
        <Badge variant="default" className="text-xs">
          {showLabels ? 'Partage écran' : '🖥️'}
        </Badge>
      )}
      {tools.recording && (
        <Badge variant="default" className="text-xs">
          {showLabels ? 'Enregistrement' : '🎥'}
        </Badge>
      )}
    </div>
  );
} 