import { Request, Response, Router } from 'express';
import slack from './slack';
import sentry from './sentry';
// import actions from './actions';

const router = Router();

router.use('/slack', slack);
router.use('/sentry', sentry);
// router.use('/actions', actions);

export default router;
