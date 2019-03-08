package controllers

import java.text.SimpleDateFormat

import javax.inject._
import play.api._
import play.api.mvc._

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */

object FrontendRequest {
  import io.circe._, io.circe.generic.semiauto._
  implicit val fooDecoder: Decoder[FrontendRequest] = deriveDecoder[FrontendRequest]
  implicit val fooEncoder: Encoder[FrontendRequest] = deriveEncoder[FrontendRequest]
}

case class FrontendRequest(
                    startDate: String,
                    endDate: String,
                    uniqueName: String,
                    uniqueBaseName: String
                  )

@Singleton
class HomeController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  /**
   * Create an Action to render an HTML page.
   *
   * The configuration in the `routes` file means that this method
   * will be called when the application receives a `GET` request with
   * a path of `/`.
   */
  def index() = Action { implicit request: Request[AnyContent] =>
    println("Hello")
    Ok(views.html.index())
  }



  def handleReq() = Action { implicit request: Request[AnyContent] => {
    import io.circe.syntax._
    import io.circe.parser._

    request.body.asJson.map{x =>
      decode[FrontendRequest](x.toString()) match {
        case Left(e) => Ok("Failure")
        case Right(x) => {
          //Open file
          val buf = scala.io.Source.fromFile("/tmp/league.csv")

          val LEAGUE = 0
          val DATE = 1
          val ID = 2
          val TYPE = 3
          val NAME = 4
          val BASETYPE = 5
          val VARIANT = 6
          val LINKS = 7
          val VALUE = 8
          val CONFIDENCE = 9

          val formatter = new SimpleDateFormat("yyyy-MM-dd")

          val formattedStartDate = formatter.parse(x.startDate.take(10))
          val formattedEndDate = formatter.parse(x.endDate.take(10))

          val read = buf.getLines().map(_.split(",").map(_.trim))
            .filter(z => z(NAME).contains(x.uniqueName))
            .filter(z => z(BASETYPE).contains(x.uniqueBaseName)).toSeq.map(_.toSeq)

          val sequenced = read.map(x => (x(DATE), x(VALUE)))

          val dateFiltered = sequenced.filter{ case(date, value) =>
            val parsed = formatter.parse(date)

            parsed.after(formattedStartDate) && parsed.before(formattedEndDate)
          }

          val sorted = dateFiltered.sortBy{ case (date, value) => formatter.parse(date).getTime }.map(_._2).zipWithIndex.map{ case (v, i) => (i, v)}

          Ok(sorted.asJson.toString)
        }
      }
    }.getOrElse(Ok("Failure"))
  }}
}
