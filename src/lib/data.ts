import type { Agent, User, Project, Folder } from './types';
import { PlaceHolderImages } from './placeholder-images';

const findImage = (id: string) => {
    const img = PlaceHolderImages.find(p => p.id === id);
    if (!img) {
      console.warn(`Image with id "${id}" not found in placeholder-images.json`);
      return '';
    }
    return img.imageUrl;
  }

export const agents: Agent[] = [
  {
    id: 'agent-1',
    name: 'Youtube Optimizator',
    description: 'Optimizes video titles and descriptions for YouTube SEO.',
    status: 'active',
    credits: 850,
    avatarUrl: findImage('agent1'),
  },
  {
    id: 'agent-2',
    name: 'Web Crawler',
    description: 'Crawls websites to extract specific information.',
    status: 'active',
    credits: 80,
    avatarUrl: findImage('agent2'),
  },
  {
    id: 'agent-3',
    name: 'Video Content Strategist',
    description: 'Analyzes trends to suggest viral video ideas.',
    status: 'inactive',
    credits: 500,
    avatarUrl: findImage('agent3'),
  },
  {
    id: 'agent-4',
    name: 'Code Generator',
    description: 'Generates boilerplate code in multiple languages.',
    status: 'active',
    credits: 1000,
    avatarUrl: findImage('agent4'),
  },
  {
    id: 'agent-5',
    name: 'Support Bot',
    description: 'Provides automated customer support via chat.',
    status: 'active',
    credits: 0,
    avatarUrl: findImage('agent5'),
  },
  {
    id: 'agent-6',
    name: 'Marketplace Analyzer',
    description: 'Analyzes marketplace data to find profitable products.',
    status: 'available',
    credits: 0,
    avatarUrl: findImage('agent6'),
  },
  {
    id: 'agent-7',
    name: 'Image Generator',
    description: 'Creates stunning visuals from text prompts.',
    status: 'available',
    credits: 0,
    avatarUrl: findImage('agent7'),
  },
  {
    id: 'agent-8',
    name: 'Social Media Manager',
    description: 'Schedules and posts content to social media channels.',
    status: 'available',
    credits: 0,
    avatarUrl: findImage('agent8'),
  }
];

export const users: User[] = [
  { id: 'user-1', name: 'Olivia Martin', avatarUrl: findImage('user1') },
  { id: 'user-2', name: 'Jackson Lee', avatarUrl: findImage('user2') },
  { id: 'user-3', name: 'Isabella Nguyen', avatarUrl: findImage('user3') },
  { id: 'user-4', name: 'William Kim', avatarUrl: findImage('user4') },
  { id: 'user-5', name: 'Sophia Garcia', avatarUrl: findImage('user5') },
];

export const projects: Project[] = [
  {
    id: 'proj-1',
    name: 'Q3 Report Analysis',
    agentIds: ['agent-1', 'agent-3'],
    teamMemberIds: ['user-1', 'user-2', 'user-3'],
    folderId: 'folder-1',
  },
  {
    id: 'proj-2',
    name: 'Competitor Website Scraping',
    agentIds: ['agent-2'],
    teamMemberIds: ['user-1', 'user-4'],
    folderId: 'folder-1',
  },
  {
    id: 'proj-3',
    name: 'Internal Documentation AI',
    agentIds: ['agent-4', 'agent-5'],
    teamMemberIds: ['user-1', 'user-2', 'user-3', 'user-4', 'user-5'],
    folderId: 'folder-2',
  },
];

export const folders: Folder[] = [
    { id: 'folder-1', name: 'Marketing' },
    { id: 'folder-2', name: 'Internal' },
];
