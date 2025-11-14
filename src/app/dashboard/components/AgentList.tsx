
'use client';

import Link from 'next/link';
import { AgentCard } from './AgentCard';
import { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';

interface Agent {
  name: string;
  description: string;
  avatar: string;
  id: string;
  status?: 'Active' | 'Reactivate';
}

interface AgentListProps {
  initialActiveAgents: Agent[];
  initialSuggestedAgents: Agent[];
}

const moreSuggestedAgents: Agent[] = [
  {
    name: 'Support Bot',
    description: 'Provides automated customer support.',
    avatar: '/avatars/agent5.png',
    id: '5',
  },
  {
    name: 'Marketplace Analyzer',
    description: 'Analyzes marketplace trends and data.',
    avatar: '/avatars/agent6.png',
    id: '6',
  },
];

export function AgentList({
  initialActiveAgents,
  initialSuggestedAgents,
}: AgentListProps) {
  const [activeAgents] = useState<Agent[]>(initialActiveAgents);
  const [suggestedAgents, setSuggestedAgents] =
    useState<Agent[]>(initialSuggestedAgents);
  const [hasLoadedMore, setHasLoadedMore] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        !hasLoadedMore
      ) {
        setSuggestedAgents((prevAgents) => [...prevAgents, ...moreSuggestedAgents]);
        setHasLoadedMore(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
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

      <Separator className="my-8" />

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
    </>
  );
}
