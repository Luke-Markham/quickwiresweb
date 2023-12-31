import { useGlobalContext } from "@/app/hooks/GlobalHooks";
import Image from "next/image";

const UserIcon = () => {
  const { user } = useGlobalContext();

  return (
    <div>
      {user.photoUrl ? (
        <div className="w-10 h-10">
          <img
            className="rounded-full"
            src={user.photoUrl}
            alt="profile picture"
          />
        </div>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="32"
          width="32"
          viewBox="0 0 32 32"
        >
          <title>profile</title>
          <g fill="#212121" className="nc-icon-wrapper">
            <path
              d="M16,32A32.808,32.808,0,0,1,3.594,29.914,1,1,0,0,1,3,29,10.011,10.011,0,0,1,13,19h6A10.011,10.011,0,0,1,29,29a1,1,0,0,1-.594.914A32.808,32.808,0,0,1,16,32Zm12-3h0Z"
              fill="#212121"
            ></path>
            <path
              data-color="color-2"
              d="M16,17c-4.579,0-8-4.751-8-9A8,8,0,0,1,24,8C24,12.249,20.579,17,16,17Z"
            ></path>
          </g>
        </svg>
      )}
    </div>
  );
};

export default UserIcon;
