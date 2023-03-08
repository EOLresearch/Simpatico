import { useState } from "react";

import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';

export default function AvatarGenerator({ }) {


  const avatarSelector = () => {
    const avatar = createAvatar(lorelei, {
      seed: 'John Doe',
    });
    console.log(avatar)

    const svg = avatar.toString();
    return svg
  }
  console.log(avatarSelector())

  return (
    <div className='avatar-generator'>

    </div>
  )
}