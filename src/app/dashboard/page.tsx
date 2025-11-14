
import Link from 'next/link';
import { AgentCard } from './components/AgentCard';
import { Separator } from '@/components/ui/separator';

const activeAgents = [
  {
    name: 'Data Miner',
    description: 'Extracts and analyzes data from various sources.',
    avatar: '/avatars/agent1.png',
    id: '1',
    status: 'Active',
  },
  {
    name: 'Web Crawler',
    description: 'Crawls websites to gather specific information.',
    avatar: '/avatars/agent2.png',
    id: '2',
    status: 'Reactivate',
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
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Tus Agentes
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {activeAgents.map((agent) => (
            <Link href={`/dashboard/agent/${agent.id}`} key={agent.id}>
              <AgentCard
                name={agent.name}
                description={agent.description}
                avatarUrl={agent.avatar}
                status={agent.status}
              />
            </Link>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Agentes Sugeridos
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {suggestedAgents.map((agent) => (
            <Link href={`/dashboard/agent/${agent.id}`} key={agent.id}>
              <AgentCard
                name={agent.name}
                description={agent.description}
                avatarUrl={agent.avatar}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
