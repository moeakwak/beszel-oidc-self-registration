import PocketBase from 'pocketbase';

export async function linkUserWithOidc(beszelUrl: string, token: string) {
  const pb = new PocketBase(beszelUrl);
  pb.authStore.save(token, null);

  await pb.collection('users').authWithOAuth2({
    provider: 'oidc',
    createData: {
      emailVisibility: true,
    }
  });
} 