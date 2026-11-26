import hashlib
import unittest
from translation_inventory import Extractor

class InventoryTests(unittest.TestCase):
    def test_metadata_and_visible_content(self):
        parser = Extractor()
        parser.feed('<html><head><title>Guía de Río</title><meta name="description" content="Visita Río"></head><body><img src="rio.jpg" alt="Playa de Copacabana"><button aria-label="Reservar" data-es="Reservar">Reservar</button><input placeholder="Tu nombre"><script>const story = "Historia de Río";</script><style>body {color:red}</style></body></html>')
        parser.close()
        units = {v["source"]: v["kinds"] for v in parser.units.values()}
        self.assertIn("Guía de Río", units)
        self.assertIn("Visita Río", units)
        self.assertIn("Playa de Copacabana", units)
        self.assertIn("Tu nombre", units)
        self.assertEqual(set(units["Reservar"]), {"aria-label", "data-es", "text"})
        self.assertEqual(len(parser.scripts), 1)
        self.assertNotIn('const story = "Historia de Río";', units)
        self.assertNotIn("body {color:red}", units)
    def test_stable_hash(self):
        parser = Extractor()
        parser.feed("<p> Río </p><p>Río</p>")
        self.assertEqual(list(parser.units), [hashlib.sha256("Río".encode()).hexdigest()])

if __name__ == "__main__":
    unittest.main()
