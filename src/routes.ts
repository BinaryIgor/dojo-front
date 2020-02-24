const home = '/home';
const tasks = '/tasks';
const doers = '/doers';
const profile = '/profile';

export const routes = {
    start: '*',
    signUp: '/sign-up',
    signIn: '/sign-in',
    home: home,
    accountActivation: '/account-activation/:token',
    tasks: tasks,
    newTask: createSubpath(tasks, "new"),
    doers: doers,
    profile: profile,
    editProfile: createSubpath(profile, 'edit'),
    profileDetails: createSubpath(profile, 'details'),
    messages: createSubpath(profile, 'messages')
};

function createSubpath(main: string, path: string) {
    return `${main}/${path}`;
}