import React, { useEffect, useState } from 'react';
import { ProfileSidebar } from './sidebar';
import { getMyAccount } from '@/utils/user';
export default async function Menu() {
    const myAccount = await getMyAccount();
    return <ProfileSidebar myAccount={myAccount} />;
}
