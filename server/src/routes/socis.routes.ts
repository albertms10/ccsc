import * as express from "express";
import * as controller from "../controllers/socis.controller";
import {
  isAuthor,
  isAuthorOrBoardOfDirectors,
  isBoardOfDirectors,
  verifyAccessToken,
  verifyEmailToken,
} from "../middleware/auth-jwt";

const router = express.Router();

router
  .route("/")
  .get([verifyAccessToken, isBoardOfDirectors], controller.socis_get)
  .post([verifyAccessToken, isBoardOfDirectors], controller.socis_post);

router.route("/alta").post([verifyEmailToken], controller.socis_post);

router
  .route("/count")
  .get([verifyAccessToken, isBoardOfDirectors], controller.socis_count);

router
  .route("/historial")
  .get([verifyAccessToken, isBoardOfDirectors], controller.socis_historial);

router
  .route("/:id")
  .get([verifyAccessToken], controller.socis_detall)
  .delete([verifyAccessToken, isBoardOfDirectors], controller.socis_delete);

router
  .route("/:id/formacions")
  .get([verifyAccessToken], controller.socis_detall_formacions);

router
  .route("/:id/projectes")
  .get([verifyAccessToken], controller.socis_detall_projectes);

router
  .route("/:id/assajos")
  .get([verifyAccessToken], controller.socis_detall_assajos);

router
  .route("/:id/acceptacions")
  .get(
    [verifyAccessToken, isAuthorOrBoardOfDirectors],
    controller.socis_detall_acceptacions_get
  )
  .put([verifyAccessToken, isAuthor], controller.socis_detall_acceptacions_put);

router
  .route("/:id/activitat")
  .get(
    [verifyAccessToken, isAuthorOrBoardOfDirectors],
    controller.socis_detall_activitat
  );

router
  .route("/:id/alta")
  .post([verifyAccessToken, isBoardOfDirectors], controller.socis_detall_alta);

router
  .route("/:id/baixa")
  .put(
    [verifyAccessToken, isAuthorOrBoardOfDirectors],
    controller.socis_detall_baixa
  );

router
  .route("/:id/propers-assajos")
  .get(
    [verifyAccessToken, isAuthorOrBoardOfDirectors],
    controller.socis_detall_propersassajos
  );

export default router;
