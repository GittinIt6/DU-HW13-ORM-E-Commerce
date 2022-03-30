const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{model:Product, through:ProductTag}]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const singleTagData = await Tag.findByPk(req.params.id, {
      include: [{ model:Product, through: ProductTag }]
    });

    if (!singleTagData) {
      res.status(404).json({ message: 'No Tag or Product found with this id!' });
      return;
    }

    res.status(200).json(singleTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTagData = await Tag.create(req.body);
    res.status(200).json(newTagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id/:tag_name', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    // //check if id exists
    // const idCheck = await Tag.findOne({where: {id: req.params.id}});
    
    // //exit if id does not exist
    // if (!idCheck) {
    //   res.status(404).json({ message: 'No TAG found with this id!' });
    //   return;
    // }

    const singleTagData = await Tag.update(
      {
        tag_name: req.params.tag_name,
      },
      {where: {
        id: req.params.id}
      }
    );

      if (singleTagData[0] !== 1) {
      res.status(404).json({ message: 'No TAG found with this id!' });
      return;
      };

    res.status(200).json(singleTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const singleTagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!singleTagData) {
      res.status(404).json({ message: 'No TAG found with this id!' });
      return;
    }

    res.status(200).json(singleTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
