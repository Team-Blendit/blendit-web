import ManageRouteClient from './ManageRouteClient';

export async function generateStaticParams() {
  return [{ id: [] }];
}

export default function NetworkingManagePage() {
  return <ManageRouteClient />;
}
