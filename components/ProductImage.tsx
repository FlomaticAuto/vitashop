import Image from 'next/image';

interface Props {
  image: string;
  name: string;
}

export default function ProductImage({ image, name }: Props) {
  return (
    <Image
      src={image}
      alt={name}
      width={200}
      height={140}
      className="object-contain w-full h-full"
      priority={false}
    />
  );
}
