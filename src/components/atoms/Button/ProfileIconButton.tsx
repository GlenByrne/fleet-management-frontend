import { Menu } from '@headlessui/react';

type ProfileIconButtonProps = {
  src: string;
};

function ProfileIconButton({ src }: ProfileIconButtonProps) {
  return (
    <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
      <span className="sr-only">Open user menu</span>
      <img className="h-8 w-8 rounded-full" src={src} alt="" />
    </Menu.Button>
  );
}

export default ProfileIconButton;
