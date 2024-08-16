import { useTheme } from '@emotion/react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { formatFileSize, useCSVReader } from 'react-papaparse';
import { transformProductsInput } from 'src/utils/transform-products';

const GREY = '#CCC';
const GREY_DIM = '#AAA';
const DEFAULT_REMOVE_HOVER_COLOR = '#A01919';

export default function CsvReader({ setResults, statusInput }) {
  const theme = useTheme();
  const { CSVReader } = useCSVReader();

  const [zoneHover, setZoneHover] = useState(false);
  const [removeHoverColor, setRemoveHoverColor] = useState(DEFAULT_REMOVE_HOVER_COLOR);
  const [acceptedData, setAcceptedData] = useState();

  useEffect(() => {
    if (acceptedData) {
      const outputData = transformProductsInput(acceptedData.data, statusInput);
      setResults(outputData);
    }
  }, [acceptedData, setResults, statusInput]);

  return (
    <CSVReader
      onUploadAccepted={(results) => {
        setAcceptedData(results);
        setZoneHover(false);
      }}
      onDragOver={(event) => {
        event.preventDefault();
        setZoneHover(true);
      }}
      onDragLeave={(event) => {
        event.preventDefault();
        setZoneHover(false);
      }}
    >
      {({ getRootProps, acceptedFile, ProgressBar, getRemoveFileProps, Remove }) => (
        <Box
          {...getRootProps()}
          style={{
            alignItems: 'center',
            border: `2px dashed ${GREY}`,
            borderRadius: 20,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'center',
            padding: 20,
            borderColor: zoneHover ? GREY_DIM : GREY,
          }}
          onMouseOver={() => setZoneHover(true)}
          onMouseOut={() => setZoneHover(false)}
        >
          {acceptedFile ? (
            <Box
              style={{
                background: theme.palette.background.default,
                border: `2px solid ${GREY}`,
                borderRadius: 20,
                display: 'flex',
                height: 120,
                width: '350px',
                position: 'relative',
                zIndex: 10,
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Box
                style={{
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
              >
                <span
                  style={{
                    borderRadius: 3,
                    marginBottom: '0.5em',
                    justifyContent: 'center',
                    display: 'flex',
                  }}
                >
                  {formatFileSize(acceptedFile.size)}
                </span>
                <span style={{ borderRadius: 3, fontSize: 12, marginBottom: '0.5em' }}>
                  {acceptedFile.name}
                </span>
              </Box>
              <Box
                style={{
                  bottom: 14,
                  position: 'absolute',
                  width: '100%',
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
              >
                <ProgressBar />
              </Box>
              <Box
                {...getRemoveFileProps()}
                style={{
                  height: 23,
                  position: 'absolute',
                  right: 6,
                  top: 6,
                  width: 23,
                  cursor: 'pointer',
                }}
                onMouseOver={() => setRemoveHoverColor(GREY_DIM)}
                onMouseOut={() => setRemoveHoverColor(DEFAULT_REMOVE_HOVER_COLOR)}
              >
                <Remove />
              </Box>
            </Box>
          ) : (
            'Drop CSV file here or click here to upload.'
          )}
        </Box>
      )}
    </CSVReader>
  );
}

CsvReader.propTypes = {
  setResults: PropTypes.func,
  statusInput: PropTypes.string,
};
