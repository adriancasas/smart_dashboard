import { AgentList } from './components/AgentList';
import { Separator } from '@/components/ui/separator';

const activeAgents = [
  {
    name: 'Data Miner',
    description: 'Extracts and analyzes data from various sources.',
    avatar: '/avatars/agent1.png',
    id: '1',
    status: 'Active' as const,
  },
  {
    name: 'Web Crawler',
    description: 'Crawls websites to gather specific information.',
    avatar: '/avatars/agent2.png',
    id: '2',
    status: 'Reactivate' as const,
  },
];

const suggestedAgents = [
  {
    name: 'Content Analyst',
    description: 'Analyzes text content for sentiment and keywords.',
    avatar: '/avatars/agent3.png',
    id: '3',
  },
  {
    name: 'Code Generator',
    description: 'Generates code snippets in various languages.',
    avatar: '/avatars/agent4.png',
    id: '4',
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Tus Agentes
        </h2>
        <AgentList
          initialActiveAgents={activeAgents}
          initialSuggestedAgents={suggestedAgents}
        />
      </div>
    </div>
  );
}
