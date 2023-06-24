import { Avatar, AvatarImage, AvatarFallback } from "./primitives/Avatar";

export const UserAvatar: React.FC<{ imageUrl: string; className?: string }> = ({
  imageUrl,
  className,
}) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={imageUrl} />
      <AvatarFallback>OG</AvatarFallback>
    </Avatar>
  );
};

export const MyAvatar: React.FC<{ className?: string }> = ({ className }) => (
  <UserAvatar
    className={className}
    imageUrl="https://media.licdn.com/dms/image/D4E03AQGEu93ehaEucA/profile-displayphoto-shrink_100_100/0/1675407583125?e=1692835200&v=beta&t=qe1mCCS79H25N_h_VTUtEZ_XoslNvPv30y3QPv8rS8U"
  />
);
