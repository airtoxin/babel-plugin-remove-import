module.exports = function({ types: t }, { packages } = { packages: [] }) {
  const removeReferencedChildPath = (imports, childPath) => {
    for (const i of imports) {
      if (t.isReferenced(childPath, i)) {
        path.remove();
        break;
      }
    }
  };

  return {
    name: "babel-plugin-remove-import",
    visitor: {
      ImportDeclaration(ipath) {
        if (packages.includes(ipath.node.source.value)) {
          ipath.parentPath.traverse(
            {
              VariableDeclaration(path) {
                removeReferencedChildPath(this.imports, path);
              },
              ClassProperty(path) {
                removeReferencedChildPath(this.imports, path);
              }
            },
            { imports: ipath.node.specifiers.map(s => s.imported) }
        );
          ipath.remove();
        }
      }
    }
  };
};
