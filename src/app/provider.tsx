import type { NavigateOptions } from 'react-router-dom';
import { HeroUIProvider } from '@heroui/system';
import { useHref } from 'react-router-dom';
import { QueryClientProvider as TanStackQueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/shared/lib/react-query/react-query.lib';
declare module '@react-types/shared' {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <TanStackQueryClientProvider client={queryClient}>
      <HeroUIProvider useHref={useHref}>{children}</HeroUIProvider>
    </TanStackQueryClientProvider>
  );
}
