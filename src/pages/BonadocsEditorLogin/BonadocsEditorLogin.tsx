import { Button } from "@/components/button/Button";
import { Logo } from "@/components/logo/Logo";
import React, { useState } from "react";
import { loginGoogleUser, loginGithubUser } from "@/store/auth/authSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { useLocation } from "react-router-dom";

interface BonadocsEditorLoginProps {
  className?: string;
}

export const BonadocsEditorLogin: React.FC<BonadocsEditorLoginProps> = ({
  className,
}) => {
  const [queryParameters] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const uri = queryParameters.get("uri");
  const [loading, setLoading] = useState<boolean>(false);

  const location = useLocation();

  return (
    <div className="bonadocs__editor__login">
      <div className="bonadocs__editor__login__inner">
        <Logo className="bonadocs__editor__sidebar__logo" />
        <h2 className="bonadocs__editor__login__inner__title">
          Get Started with Bonadocs
        </h2>
        <div className="bonadocs__editor__login__inner__cta">
          <Button
            disabled={loading}
            className="bonadocs__editor__login__inner__cta__button"
            onClick={async () => {
              setLoading(true);
              try {
                const res = await dispatch(loginGoogleUser());
                if (!res.payload) {
                  setLoading(false);
                  return;
                }
                // if (!redirect) {
                //   navigate({
                //     pathname: "/teams",

                //   });
                // } else navigate({
                //   pathname: redirect,
                //   search: `?uri=${uri}`,
                // });

                const { from } = location.state || {
                  from: { pathname: "/teams" },
                };

                navigate(from, { replace: true });
              } catch (err) {
                setLoading(false);
              }
            }}
          >
            <>
              <svg
                className="bonadocs__editor__login__inner__cta__button__icon"
                width="24"
                height="24"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_185_10965)">
                  <path
                    d="M12.4998 10.7082V15.3554H18.9579C18.6743 16.85 17.8233 18.1155 16.547 18.9664L20.4415 21.9882C22.7106 19.8937 24.0197 16.8174 24.0197 13.1628C24.0197 12.3119 23.9433 11.4937 23.8015 10.7083L12.4998 10.7082Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M5.77461 15.174L4.89625 15.8464L1.78711 18.2682C3.76165 22.1845 7.80862 24.89 12.4995 24.89C15.7394 24.89 18.4557 23.8209 20.4412 21.9882L16.5467 18.9664C15.4776 19.6864 14.114 20.1228 12.4995 20.1228C9.37951 20.1228 6.72868 18.0174 5.77952 15.181L5.77461 15.174Z"
                    fill="#34A853"
                  />
                  <path
                    d="M1.78718 7.51184C0.969042 9.12632 0.5 10.9482 0.5 12.8899C0.5 14.8317 0.969042 16.6536 1.78718 18.2681C1.78718 18.2789 5.77997 15.1699 5.77997 15.1699C5.53998 14.4499 5.39812 13.6863 5.39812 12.8898C5.39812 12.0934 5.53998 11.3298 5.77997 10.6098L1.78718 7.51184Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12.4997 5.66819C14.267 5.66819 15.8379 6.27909 17.0925 7.45728L20.5288 4.02096C18.4452 2.07918 15.7398 0.890015 12.4997 0.890015C7.80887 0.890015 3.76165 3.58456 1.78711 7.51184L5.77978 10.61C6.72882 7.77363 9.37976 5.66819 12.4997 5.66819Z"
                    fill="#EA4335"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_185_10965">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                      transform="translate(0.5 0.890015)"
                    />
                  </clipPath>
                </defs>
              </svg>
              Login with Google
            </>
          </Button>
          <Button
            disabled={loading}
            className="bonadocs__editor__login__inner__cta__button"
            onClick={async () => {
              setLoading(true);
              try {
                const res = await dispatch(loginGithubUser());
                if (!res.payload) {
                  setLoading(false);
                  return;
                }
                const { from } = location.state || {
                  from: { pathname: "/teams" },
                };
                navigate(from, { replace: true });
              } catch (err) {
                console.log(err);
                setLoading(false);
              }
            }}
          >
            <>
              <img
                className="bonadocs__editor__login__inner__cta__button__icon"
                src="https://img.icons8.com/3d-fluency/94/github.png"
                alt="github"
              />
              Login with Github
            </>
          </Button>
        </div>
      </div>

      {/* <div className="absolute inset-0 justify-center"></div> */}
    </div>
  );
};
