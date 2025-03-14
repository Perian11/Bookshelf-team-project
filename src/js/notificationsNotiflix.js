import Notiflix from 'notiflix';

Notiflix.Notify.init({
  width: '500px',
  position: 'center-top',
  borderRadius: '16px',
  distance: '5px',
  fontSize: '18px',
  cssAnimationStyle: 'zoom', 
  closeButton: true,
  failure: {
    background: '#e53765',
    textColor: 'var(--ligtht-theme)',
    notiflixIconColor: 'var(--ligtht-theme)'
  },
  success: {
    background: '#45e7ea',
    textColor: 'var(--dark-theme)',
    notiflixIconColor: 'var(--dark-theme)',
    
  },
  warning:{
    background: 'var(--color-yellow-componemt)',
    textColor: 'var(--dark-theme)',
    notiflixIconColor: 'var(--dark-theme)'
  },
  info: {
    background: '#7150f5',
    textColor: 'var(--ligtht-theme)',
    notiflixIconColor: 'var(--ligtht-theme)'
  }
});

export default function reportsFailure(message) {
  Notiflix.Notify.failure(`${message}`, {width: '380px'});
}

//reportsFailure('Sorry, no books were found.')

function reportsSuccess(message) {
  Notiflix.Notify.success(`${message}`, {width: '380px'})
}

//reportsSuccess('Hello! Authorization was successful!');

function reportsWarning(message) {
  Notiflix.Notify.warning(`${message}`, {width: '380px'})
}

//reportsWarning('Warning')

function reportsInfo(message) {
  Notiflix.Notify.info(`${message}`, {width: '380px'})
}

//reportsInfo('Move on')