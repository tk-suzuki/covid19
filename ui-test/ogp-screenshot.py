import os
import time

from selenium import webdriver

if not os.path.exists("ogp"):
  os.mkdir("ogp")

PATHS = {
  "/?dummy": (959, 500),
  "/cards/current-patients": (959, 900),
  "/cards/contacts": (959, 900),
  "/cards/discharges-summary": (959, 900),
  "/cards/inspections": (959, 900),
  "/cards/patients": (959, 900),
  "/cards/patients-summary": (959, 900),
  "/cards/querents": (959, 950)
}

options = webdriver.ChromeOptions()
options.add_argument("--headless")
options.add_argument("--hide-scrollbars")

driver = webdriver.Chrome(options=options)

for lang in ("ja", "en", "zh-cn", "zh-tw", "ko", "ja-basic"):
  if not os.path.exists("ogp/{}".format(lang)):
    os.mkdir("ogp/{}".format(lang))
  for path, size in PATHS.items():
    driver.set_window_size(*size)
    driver.get(
      "http://localhost:8000{}?ogp=true".format(
        path if lang == "ja" else "/{}{}".format(lang, path)
      )
    )
    path = path.replace("/cards/", "").replace("/", "_")
    time.sleep(3)
    driver.save_screenshot(
      "ogp/{}.png".format(
        path if lang == "ja" else "{}/{}".format(lang, path)
      )
    )
