import re
import unittest
from pathlib import Path


PAGE = Path(__file__).resolve().parents[1] / "fr" / "hospedaje" / "index.html"


class FrenchLodgingIndexTests(unittest.TestCase):
    def test_language_canonical_and_private_indexing(self):
        html = PAGE.read_text(encoding="utf-8")
        self.assertRegex(html, r'<html\b[^>]*\blang="fr"')
        self.assertRegex(
            html,
            r'<link\b[^>]*rel="canonical"[^>]*href="https://www\.ernestinhocarioca\.com\.br/fr/hospedaje/"',
        )
        self.assertRegex(html, r'<meta\b[^>]*name="robots"[^>]*content="noindex,nofollow"')
        self.assertRegex(html, r'<meta\b[^>]*name="googlebot"[^>]*content="noindex,nofollow"')
        self.assertIn('hreflang="fr" href="https://www.ernestinhocarioca.com.br/fr/hospedaje/"', html)


if __name__ == "__main__":
    unittest.main()
