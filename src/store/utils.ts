function makeAction(actionType: any) {
    const newAction = (payload: any) => ({
        type: actionType,
        payload,
    });
    newAction.type = actionType;

    return newAction;
}
export const createSuccessActionType = (type: any) => `${type}_SUCCESS`;
export const createFailureActionType = (type: any) => `${type}_FAILURE`;

export function createAction(actionType: any) {
    const rootAction: any = makeAction(actionType);

    return rootAction;
}
