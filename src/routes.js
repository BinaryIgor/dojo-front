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
    doers: doers,
    profile: profile,
    editProfile: createSubpath(profile, 'edit'),
    profileDetails: createSubpath(profile, 'details'),
    messages: createSubpath(profile, 'messages')
};

function createSubpath(main, path) {
    return `${main}/${path}`;
}