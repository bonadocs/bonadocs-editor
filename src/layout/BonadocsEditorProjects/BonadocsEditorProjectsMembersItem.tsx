import { Popover } from "@headlessui/react";
import React, { useState } from "react";
import { usePopper } from "react-popper";
import { ReactComponent as MenuIcon } from "@/assets/project/menu.svg";
import { BonadocsEditorTeamsModalMemberDelete } from "../BonadocsEditorTeams/BonadocsEditorTeamsModal/BonadocsEditorTeamsModalMemberDelete";
import { teamRoles } from "@/data/team/TeamRoles";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { updateMemberRole } from "@/store/team/teamSlice";
import { useAuthContext } from "@/context/AuthContext";

interface BonadocsEditorProjectsMembersItemProps {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  id: number;
  updateMembers: () => void;
  currentUserRole: (role: any) => void;
}

export const BonadocsEditorProjectsMembersItem: React.FC<
  BonadocsEditorProjectsMembersItemProps
> = ({
  firstName,
  lastName,
  email,
  role,
  id,
  updateMembers,
  currentUserRole,
}) => {
  const { user } = useAuthContext();

  const [show, setShow] = useState<boolean>(false);

  let [referenceElement, setReferenceElement] = useState<any>();
  let [referenceElementRole, setReferenceElementRole] = useState<any>();
  let [popperElement, setPopperElement] = useState<any>();
  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom-end",
    strategy: "absolute",
  });

  let { styles: stylesRole, attributes: attributesRole } = usePopper(
    referenceElementRole,
    popperElement,
    {
      placement: "bottom-end",
      strategy: "absolute",
    }
  );

  const currentTeam = useSelector((state: RootState) => state.team.currentTeam);

  const userRole = teamRoles.find((role) => {
    if (arraysEqual(role.permission, currentTeam.permissions as string[])) {
      currentUserRole(role);
      return role;
    }
  });

  function arraysEqual<T>(arr1: T[], arr2: T[]): boolean {
    // First, check if they have the same length
    if (arr1.length !== arr2.length) {
      return false;
    }

    // Create sets from both arrays
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);

    // Check if both sets have the same size
    if (set1.size !== set2.size) {
      return false;
    }

    // Check if every element in set1 is also in set2
    for (let element of set1) {
      if (!set2.has(element)) {
        return false;
      }
    }

    return true;
  }

  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="bonadocs__editor__projects__members">
      <div className="bonadocs__editor__projects__members__details white">{`${firstName} ${lastName}`}</div>
      <div className="bonadocs__editor__projects__members__details">{` ${email}`}</div>
      <div className="bonadocs__editor__projects__members__details flex">
        {(userRole?.value === "owner" || userRole?.value === "admin") &&
        currentTeam.activeSubscription ? (
          <Popover>
            <Popover.Button className="flex" ref={setReferenceElementRole}>
              <>
                <h4>{role}</h4>

                <svg
                  className={`bonadocs__accordion__parent__icon bona__transition`}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.31344 3.64645C6.5087 3.45118 6.82528 3.45118 7.02055 3.64645L11.0205 7.64645C11.1143 7.74021 11.167 7.86739 11.167 8C11.167 8.13261 11.1143 8.25979 11.0205 8.35355L7.02055 12.3536C6.82528 12.5488 6.5087 12.5488 6.31344 12.3536C6.11818 12.1583 6.11818 11.8417 6.31344 11.6464L9.95989 8L6.31344 4.35355C6.11818 4.15829 6.11818 3.84171 6.31344 3.64645Z"
                    fill="currentColor"
                  />
                </svg>
              </>
            </Popover.Button>
            <Popover.Panel
              ref={setPopperElement}
              style={stylesRole.popper}
              {...attributesRole.popper}
              className="bonadocs__editor__param__item__popover bor-main"
            >
              {({ close }) => (
                <>
                  {teamRoles.map((role, index) => (
                    <div
                      onClick={async () => {
                        if (user && email === user.email) {
                          if (
                            window.confirm(
                              "Are you sure you want to change your own role?"
                            )
                          ) {
                            const memberUpdated = await dispatch(
                              updateMemberRole({
                                memberId: id.toString(),
                                role: role.permission,
                              })
                            );
                            if (!memberUpdated.payload) return;
                            updateMembers();
                            close();
                          } else return;
                        }
                        const memberUpdated = await dispatch(
                          updateMemberRole({
                            memberId: id.toString(),
                            role: role.permission,
                          })
                        );
                        if (!memberUpdated.payload) return;
                        updateMembers();
                        close();
                      }}
                      key={index}
                      className="bonadocs__editor__param__item__teams"
                    >
                      <h4>{role.label}</h4>
                    </div>
                  ))}
                </>
              )}
            </Popover.Panel>
          </Popover>
        ) : (
          <h4>{role}</h4>
        )}
      </div>

      {(userRole?.value === "owner" || userRole?.value === "admin") &&
        currentTeam.activeSubscription && (
          <Popover className=" ma-auto">
            <Popover.Button ref={setReferenceElement}>
              <MenuIcon className="ma-auto" />
            </Popover.Button>
            <Popover.Panel
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
              className="bonadocs__editor__param__item__popover bor-main"
            >
              {({ close }) => (
                <>
                  <div
                    onClick={() => {
                      setShow(!show);
                      close();
                    }}
                    className="bonadocs__editor__param__item__teams"
                  >
                    <h4>Revoke access</h4>
                  </div>
                </>
              )}
            </Popover.Panel>
          </Popover>
        )}
      <BonadocsEditorTeamsModalMemberDelete
        email={email}
        show={show}
        memberId={id}
        closeDeleteModal={() => setShow(!show)}
        updateMembers={updateMembers}
      />
    </div>
  );
};
