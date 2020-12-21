import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faBroom,
  faCircle,
  faCircleNotch,
  faComments,
  faCut,
  faDotCircle,
  faEnvelopeOpenText,
  faFillDrip,
  faLockOpen,
  faPaperPlane,
  faPencilAlt,
  faShareAlt,
  faShieldAlt,
  faSyncAlt,
  faUsers,
  faUserSecret,
  faUserShield,
  faVectorSquare,
} from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

config.autoAddCss = false

library.add(
  faBroom,
  faCircle,
  faCircleNotch,
  faComments,
  faCut,
  faDotCircle,
  faEnvelopeOpenText,
  faFillDrip,
  faLockOpen,
  faPaperPlane,
  faPencilAlt,
  faShareAlt,
  faShieldAlt,
  faSyncAlt,
  faUsers,
  faUserSecret,
  faUserShield,
  faVectorSquare,
  faGithub
)

Vue.component('FontAwesomeIcon', FontAwesomeIcon)
