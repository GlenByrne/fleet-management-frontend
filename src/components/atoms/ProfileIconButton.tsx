import { Menu } from '@headlessui/react';

type ProfileIconButtonProps = {
  src: string;
};

const ProfileIconButton = ({ src }: ProfileIconButtonProps) => {
  return (
    <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
      <span className="sr-only">Open user menu</span>
      <img className="h-8 w-8 rounded-full" src={src} alt="" />
    </Menu.Button>
  );
};

export default ProfileIconButton;
